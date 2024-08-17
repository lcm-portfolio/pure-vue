<script setup lang="ts">
import { ref, PropType, onMounted, onUnmounted, computed } from "vue";
import searchBar from "./Widgets/SearchBar.vue";
import cartIcon from "./Widgets/CartIcon.vue";
import { router } from "../router/index.ts";
import { Icon } from "@iconify/vue";
import { useCart } from "@/store/cart";
const cartStore = useCart();
const nbOfProductsIncart = computed(() => {
  return cartStore.getCount;
});

defineProps<{isAuthenticated: boolean}>();
const emit = defineEmits<{
  (e: "signOut"): void;
}>();

// Définir l'état du menu
const isMenuOpen = ref(false);

// Fonction pour basculer le menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const closeMenu = () => {
  isMenuOpen.value = false;
};

// Ferme le menu lorsque l'utilisateur clique en dehors du contenu du menu
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  const burgerMenu = document.querySelector(".burger-menu");
  if (
    isMenuOpen.value &&
    !document.querySelector(".burger-content")!.contains(target) &&
    !burgerMenu!.contains(target) // Ignorer les clics sur le menu burger
  ) {
    closeMenu();
  }
};

// Ajouter l'événement de clic global lors de la création du composant
onMounted(() => {
  window.addEventListener("click", handleClickOutside);
});

// Supprimer l'événement de clic global lors de la destruction du composant
onUnmounted(() => {
  window.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="headerContainer">
    <div class="burger-menu-container">
      <div class="burger-menu" @click="toggleMenu">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <span v-if="nbOfProductsIncart" class="number-icon">{{ nbOfProductsIncart }}</span>
    </div>

    <div class="logoContainer">
      <h1 class="logo" @click="router.push('/')">P U R E</h1>
    </div>
    <div class="burger-content" :class="{ open: isMenuOpen }">
      <span class="close-btn" @click="toggleMenu"
        ><Icon icon="carbon:close-outline" color="white" width="32" height="32"
      /></span>
      <a
        class="burger-content-link"
        @click="
          router.push('/');
          closeMenu();
        "
        ><Icon class="icon" icon="carbon:home" color="white" width="32" height="32" />
        HOME
      </a>
      <a
        class="burger-content-link"
        @click="
          router.push('/products');
          closeMenu();
        "
        ><Icon class="icon" icon="carbon:store" color="white" width="32" height="32" />PRODUCTS
      </a>
      <a
        class="burger-content-link"
        @click="
          router.push('/cart');
          closeMenu();
        "
        ><cartIcon
          @click="
            router.push('/cart');
            closeMenu();
          "
          :height="32"
          :width="32"
        ></cartIcon
        >CART</a
      >
    </div>
    <div class="searchContainer">
      <searchBar></searchBar>
    </div>
    <div class="diversContainer">
      <router-link class="divers" to="/login" v-if="!isAuthenticated">login</router-link>
      <div class="divers pointer" v-else @click="emit('signOut')">logout</div>
      <router-link class="divers" to="/profile" v-if="isAuthenticated">profile</router-link>
    </div>
    <div class="cart">
      <cartIcon @click="router.push('/cart')"></cartIcon>
    </div>
  </div>
</template>

<style scoped>
.icon {
  margin: 10px;
}

.hidden {
  display: none;
}

.logo {
  font-family: var(--secondary-font);
  color: var(--font-secondary);
  margin: 0;
  cursor: pointer;
}

.headerContainer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--primary);
  font-family: var(--primary-font);
  position: sticky;
  top: 0;
}

.logoContainer {
  flex: 0 0 auto;
}

.searchContainer {
  display: flex;
  align-items: center;
}

.diversContainer {
  display: flex;
  margin-left: auto;
  align-items: center;
}

.divers {
  color: var(--font-secondary);
  font-size: 1.7rem;
  margin-right: 0.6rem;
}

.burger-menu {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.line {
  width: 25px;
  height: 3px;
  background-color: var(--font-secondary);
}

.burger-content {
  z-index: 100;
  width: 60%;
  height: 60%;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: 0.5s;
  background-color: var(--secondary);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 60px 10px 10px 10px;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  align-items: center;
  transform: translateX(-100%);
  transition:
    transform 0.5s,
    opacity 0.5s;
}

.burger-content-link {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.burger-content.open {
  transform: translateX(0);
  opacity: 1;
  transition:
    transform 0.5s,
    opacity 0.5s;
}

.burger-content a {
  color: var(--font-secondary);
  text-decoration: none;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
}
.number-icon {
  background-color: var(--font-secondary);
  color: var(--primary);
  border-radius: 50%;
  padding: 5px;
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  left: 25px;
  display: none;
  width: 25px;
  height: 25px;
  align-items: center;
  justify-content: center;
}

/*MEDIA QUERY RESPONSIVE*/
@media (max-width: 768px) {
  .headerContainer {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .burger-menu,
  .number-icon {
    display: flex;
  }
  .diversContainer,
  .cart,
  .searchContainer {
    display: none;
  }
}

.pointer {
  cursor: pointer;
}
</style>
