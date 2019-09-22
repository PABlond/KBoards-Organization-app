const genRandomNumber = () => Math.round(Math.random() * 255)
const genCustomColor = () =>
  `rgb(${genRandomNumber()}, ${genRandomNumber()}, ${genRandomNumber()})`
  
export default {
  user: {
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    previousSessions: [],
    previousAlerts: [],
    liveSessions: [],
  },
  nav: {
    isMobile: true,
    maxWidth: 0,
    maxHeight: 0,
  },
  boards: {
    list: [],
    currentBoard: {},
    columns: [
      { n: 0, name: "toDo", color: genCustomColor() },
      { n: 1, name: "progress", color: genCustomColor() },
      { n: 2, name: "done", color: genCustomColor() },
    ],
  },
}
