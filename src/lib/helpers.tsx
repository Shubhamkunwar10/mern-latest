import { ApiSuccess, ClaimNftInterface, ApiError,TransferCryptoInterface } from '@/Datatypes/interfaces/interface';
import { allowlistProof } from "./slices/Web3Profile/whitelist";
import { toast } from 'react-toastify';

export const claimNft = async ({ claimNftHandler, setMintMsg }: { claimNftHandler: ClaimNftInterface, setMintMsg: any },) => {
  try {

    // Define a separate async function to handle the claim operation
    const performClaim = async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await toast.promise(
          claimNftHandler.claim({
            args: [claimNftHandler.address, 1, "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", 0, allowlistProof, []]
          }),
          {
            pending: 'Claiming Nft. Wait a bit.',
            success: 'Nft Claimed Successfully 👌',
            error: 'Error Claiming NFt. Join discord to know more 🤯'
          }
        )
        setMintMsg("Nft minted successFully")
        return response;
      } catch (err) {
        throw err;
      }
    };

    const data = await performClaim().then((res: unknown) => {
      console.log(res);

      const apiSuccess: ApiSuccess = {
        statusCode: 200,
        message: 'Mint Successfull',
        data: res as object,
      };
      console.log(apiSuccess);
      return apiSuccess;
    }).catch((err: unknown) => {
      console.log(err);
    });
    return data;
  } catch (error) {
    const castedError = error as ApiError;
    console.error('Error Claiming NFT', error);
    throw castedError?.error === "string" ? castedError?.error : 'Unknown Error';
  }
};

export const transferCrypto = async ({ transferCryptoHandler }: { transferCryptoHandler: TransferCryptoInterface },) => {
  try {

    // Define a separate async function to handle the claim operation
    const performTransfer = async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await toast.promise(
          transferCryptoHandler.transfer({
            args: [transferCryptoHandler.to,transferCryptoHandler.amount]
          }),
          {
            pending: 'Transferring  Crypto. Wait a bit.',
            success: 'Transferred Successfully 👌',
            error: 'Error Transferring. Join discord to know more 🤯'
          }
        )
        return response;
      } catch (err) {
        throw err;
      }
    };

    const data = await performTransfer().then((res: unknown) => {
      console.log(res);

      const apiSuccess: ApiSuccess = {
        statusCode: 200,
        message: 'Mint Successfull',
        data: res as object,
      };
      console.log(apiSuccess);
      return apiSuccess;
    }).catch((err: unknown) => {
      console.log(err);
    });
    return data;
  } catch (error) {
    const castedError = error as ApiError;
    console.error('Error Claiming NFT', error);
    throw castedError?.error === "string" ? castedError?.error : 'Unknown Error';
  }
};
