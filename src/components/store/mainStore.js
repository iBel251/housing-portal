import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useMainStore = create(
  devtools(
    (set) => ({
      userData: null,
      notifications: [],
      messages: [],
      userHouse: null,
      favoriteHouses: null,
      totalHousePages: 0,
      refetchTrigger: false,
      recountTrigger: false,
      refetchMessagesTrigger: false,
      unreadMessageCount: 0,
      allHouses: [],
      allUsers: null,
      adminData: null,
      last: null,
      activeLink: "home",
      activePage: null,
      activeChatRoomId: null,
      userStatus: null,

      setUserData: (data) => set({ userData: data }),
      setNotifications: (data) => set({ notifications: data }),
      setMessages: (data) => set({ messages: data }),
      setUserHouse: (data) => set({ userHouse: data }),
      setFavoriteHouses: (data) => set({ favoriteHouses: data }),
      setTotalHousePages: (data) => set({ totalHousePages: data }),
      toggleRefetch: () =>
        set((state) => ({ refetchTrigger: !state.refetchTrigger })),
      toggleRecount: () =>
        set((state) => ({ recountTrigger: !state.recountTrigger })),
      toggleMessagesRefetch: () =>
        set((state) => ({
          refetchMessagesTrigger: !state.refetchMessagesTrigger,
        })),
      setUnreadMessageCount: (count) => set({ unreadMessageCount: count }),
      setAllHouses: (houses) => set({ allHouses: houses }),
      setAllUsers: (users) => set({ allUsers: users }),
      setAdminData: (data) => set({ adminData: data }),
      setActiveLink: (link) => set({ activeLink: link }),
      setActivePage: (page) => set({ activePage: page }),
      setActiveChatRoomId: (id) => set({ activeChatRoomId: id }),
      setUserStatus: (status) => set({ userStatus: status }),

      // function to update user status
      updateUserStatus: (userId, newStatus) =>
        set((state) => ({
          allUsers: state.allUsers.map((user) =>
            user.id === userId ? { ...user, status: newStatus } : user
          ),
        })),
      // function to update house status
      updateHouseStatus: (houseId, newStatus) =>
        set((state) => ({
          allHouses: state.allHouses.map((house) =>
            house.id === houseId ? { ...house, status: newStatus } : house
          ),
        })),
    }),
    "MainStore"
  )
);

const persistData = (store) => {
  const { name } = store;

  const persistedData = localStorage.getItem(name);

  if (persistedData) {
    store.setState(JSON.parse(persistedData));
  }

  store.subscribe((snapshot) => {
    localStorage.setItem(name, JSON.stringify(snapshot));
  });
};

persistData(useMainStore);

export default useMainStore;
