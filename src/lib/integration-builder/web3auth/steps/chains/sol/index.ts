import { replaceFileVariable, toSteps } from "../../../../utils";
import * as initialize from "./initializing.mdx";

const STEPS = toSteps({
  initialize,
});

const chainSteps = {
  STEPS,
  build({ filenames, files, steps, customLogin }) {
    const newFiles = files;
    if (customLogin === "no")
      newFiles["web3auth/web/input.js"] = replaceFileVariable(
        files["web3auth/web/input.js"],
        "const web3AuthCtorParams = {};",
        `        const web3AuthCtorParams = {
      chainConfig: { chainNamespace: "solana" },
      clientId: "YOUR_CLIENT_ID_HERE", // get your clientId from https://dashboard.web3auth.io
    };`
      );
    else
      newFiles["web3auth/web/customInput.js"] = replaceFileVariable(
        files["web3auth/web/customInput.js"],
        "const web3AuthCtorParams = {};",
        `        const web3AuthCtorParams = {
      chainConfig: { chainNamespace: "solana" },
      clientId: "YOUR_CLIENT_ID_HERE", // get your clientId from https://dashboard.web3auth.io
    };`
      );

    filenames.push("eth/ethereum.js");

    steps.push({
      ...STEPS.initialize,
      pointer: { filename: "eth/ethereum.js", range: "10-18" },
    });

    return { files: newFiles, steps, filenames };
  },
};

export default chainSteps;
