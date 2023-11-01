export async function load({params}) {
    const orders = params.orders;

    return {
        data: {
            orders
        }
    }
}