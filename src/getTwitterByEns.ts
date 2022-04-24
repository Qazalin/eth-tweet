import { ethers } from "ethers"

export async function _getTwitterByENS(
    ens: string,
    provider: ethers.providers.JsonRpcProvider
) {
    // First create an ENS resolver
    try {
        const resolver = await provider.getResolver(ens)

        console.log(`fetching ${ens}...`)
        // Then resolve their twitter handle
        return await resolver.getText("com.twitter")
    } catch (error) {}
}
