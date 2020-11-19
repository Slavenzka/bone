import { exchangerAddress } from 'utils/const'
import BigNumber from 'bignumber.js'

const AllowanceStatuses = {
  RESET: 'RESET',
  APPROVE: 'APPROVE',
  SWAP: 'SWAP'
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function waitTransaction(web3, txHash) {
  console.log(web3)
  console.log(txHash)
  let tx = null;
  while (tx == null) {
    tx = await web3.eth.getTransactionReceipt(txHash);
    await sleep(2000);
  }
  console.log("Transaction " + txHash + " was mined.");
  return (tx.status);
}

export const checkAllowance = (userWallet, tokenInstance, selectedSource, amountToExchange, saveAllowance) => {
  console.log(tokenInstance)
  return tokenInstance.methods.allowance(userWallet, exchangerAddress).call()
    .then(response => {
      const allowance = Number(new BigNumber(+response).shiftedBy(-selectedSource.decimals).toFixed())
      saveAllowance(allowance)
      console.log( `Allowance for ${selectedSource.label}: ${allowance}` )

      if (allowance !== 0 && allowance < amountToExchange) {
        console.log('Need allowance reset')
        return AllowanceStatuses.RESET
      }

      if (allowance !== 0 && allowance >= amountToExchange) {
        return AllowanceStatuses.SWAP
      }

      console.log('Proceed to approve')
      return AllowanceStatuses.APPROVE
    })
}

const approveToken = ({ userWallet, tokenInstance, amountWithDecimals, gas = 100000, gasPrice }) => {
  return tokenInstance.methods.approve(exchangerAddress, amountWithDecimals).send({
    from: userWallet,
    gas: `0x${(gas).toString(16)}`,
    gasPrice:`${gasPrice}`,
  })
    .then(response => {
      console.log(response)

      return response.status
    })
}

export const tokenApproveSequence = ({ allowanceStatus, tokenInstance, amountWithDecimals, gas = 100000, gasPrice, userWallet }) => {
  return new Promise((resolve, reject) => {
    new Promise((resolveInner, rejectInner) =>{
      if (allowanceStatus === AllowanceStatuses.RESET) {
        console.log('Resetting allowance')
        approveToken({
          userWallet,
          tokenInstance,
          amountWithDecimals: 0,
          gasPrice
        })
          .then(status => resolveInner(status))
      }

      if (allowanceStatus === AllowanceStatuses.APPROVE) {
        resolveInner(true)
      }

      if (allowanceStatus === AllowanceStatuses.SWAP) {
        resolveInner('swap')
      }
    })
      .then(status => {
        if (status === 'swap') {
          console.log('Proceeding to swap')
          resolve(true)
        } else {
          console.log('Approving new allowance')
          status && approveToken({
            userWallet,
            tokenInstance,
            amountWithDecimals,
            gasPrice
          })
            .then(status => {
              console.log(`Final status after token approval: ${status}`)
              resolve(status)
            })
        }
      })
  })
}
