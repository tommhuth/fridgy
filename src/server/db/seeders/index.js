import itemsSeeder from "./items-seeder"

export default function () {
    return Promise.all([itemsSeeder()])
}