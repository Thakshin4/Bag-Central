export async function load({params}) {
    const product = params.product;

    return {
        data: {
            product
        }
    }
}