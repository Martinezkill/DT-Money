import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from '@radix-ui/react-dialog';
import LogoImg from '../../assets/Logo.svg'
import { NewTransactionModal } from "./NewTransactionsModal/Index";

export function Header () {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={LogoImg} alt="" />
                <Dialog.Root>
                    <Dialog.DialogTrigger asChild>
                        <NewTransactionButton> Nova transaçāo </NewTransactionButton>
                    </Dialog.DialogTrigger>

                    <NewTransactionModal/>

                </Dialog.Root>
            </HeaderContent>
        </HeaderContainer>
    )
}