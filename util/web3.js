import Web3 from "web3";
import env from "../config/env";

const web3 = new Web3(new Web3.providers.HttpProvider(env.ETHER_CLIENT));
export default web3;