import fs from "fs";
import path from "path";
import hre from "hardhat";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const LandRegistry = await hre.ethers.getContractFactory("LandRegistry");
  const landRegistry = await LandRegistry.deploy();

  await landRegistry.waitForDeployment();

  const address = await landRegistry.getAddress();
  console.log("LandRegistry deployed to:", address);

  // Copy ABI and Contract Address to frontend
  const frontendPath = path.join(__dirname, "..", "frontend", "src", "contracts");
  if (!fs.existsSync(frontendPath)) {
    fs.mkdirSync(frontendPath, { recursive: true });
  }

  const abiPath = path.join(__dirname, "..", "artifacts", "contracts", "LandRegistry.sol", "LandRegistry.json");
  const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));

  const contractData = {
    address: address,
    abi: abi.abi,
  };

  fs.writeFileSync(
    path.join(frontendPath, "LandRegistryData.json"),
    JSON.stringify(contractData, null, 2)
  );
  
  console.log("Artifacts copied to frontend");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
