import { Request, Response } from "express";
import { emailTransporter } from "../services/emailTransporter";
import { getAddressInfo } from "../services/getAddressInfo"

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, cpf } = req.body

    const address = await getAddressInfo(cpf)
    if (!address) {
      throw new Error("Deu erro no servidor getPokemonInfo")
    }
    
    const info = await emailTransporter.sendMail({
      from: `<${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: 'Cadastro na plataforma API',
      text: `Olá, ${email}! Parabéns pela inscrição!
      Segue abaixo seus dados:
      SENHA: ${password}
      DADOS: ${address.name}/${address.email} ${address.cpf}`,
      html: `<p>Olá, ${email}! <strong>Parabéns pela inscrição!</strong>
      Segue abaixo seus dados:
      SENHA: <em>${password}</em>
      DADOS: ${address.name}/${address.email} ${address.cpf}</p>`
    })

    res.send({info, message: "Cadastro realizado com sucesso"})
  } catch (error) {
    if (error instanceof Error) {
      res.send({ error, message: error.message })
    } else {
      res.send({ message: "Erro inesperado" })
    }
  }
}
