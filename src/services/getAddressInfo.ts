import axios from "axios";
import {Address} from '../types/Address'


export const getAddressInfo = async (cpf: number): Promise<Address | null> => {
    try{
      const response = await axios.get(`${cpf}/json/}`)

      const address: Address = {
        name: response.data.nome,
        email: response.data.email,
        cpf: response.data.cpf
      }

    return address

  }catch (error) {
    console.log("Error no servico getAddressInfo:", error)
    return null
  } 
}
