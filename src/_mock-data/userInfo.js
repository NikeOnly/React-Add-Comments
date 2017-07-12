class User {
    constructor(id, firstName, lastName, avatarUrl) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatarUrl = avatarUrl;
    }
}

export const users = [
    new User(0, "Alex", "Brown", "https://randomuser.me/api/portraits/men/80.jpg"),
    new User(1, "Janet", "Ryan", "https://randomuser.me/api/portraits/women/68.jpg"),
    new User(2, "Alice", "Kelly", "https://randomuser.me/api/portraits/women/93.jpg")
];

export const currentUser = users[0];
