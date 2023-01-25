// const user = {
//   id: "1",
//   name: "test",
//   room: "test"
// };

// function User({ id, name, room }) {
//   this.id = id;
//   this.name = name;
//   this.room = room;
// }

// User.prototype = Object.create(user);

// const usuario = new User({ id: "1", name: "test", room: "test" });

class User {
  constructor({ id, name, room }) {
    this.id = id;
    this.name = name;
    this.room = room;
  }
}

export { User };
