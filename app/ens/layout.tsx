import { ENSLayout as ENSLayoutC } from "@/components/layouts/ENSLayout";
import { getMetadata } from "@/utils";

export const metadata = getMetadata({
  title: "ENS | Swiss-Knife.xyz",
  description:
    "Tools for Ethereum Name Service (ENS) - Check IPFS content changes, ownership transfers and more over time.",
  images: "https://swiss-knife.xyz/og/ens-history.png",
});

const ENSLayout = ({ children }: { children: React.ReactNode }) => {
  return <ENSLayoutC>{children}</ENSLayoutC>;
};

export default ENSLayout;
