import sP from "@/components/ui/Dialogs/DialogsParrent/DialogsParrent.module.scss"
import {Button} from "@/components/ui/Button"
import sC from "@/components/ui/Dialogs/common/Dialogs.module.scss"
import {Textfield} from "@/components/ui/Textfield"

export const SetVideoById = (props: Props) => {

    return (
        <div className={sP.textFieldContainer}>
            <div className={sP.element}>
                <Textfield
                    placeholder={'HPU9xqdta3E'}
                    label={props.label}
                    value={props.tempValue}
                    onChange={e => props.setTempValue(e.currentTarget.value)}
                />
            </div>
            <div className={sC.container}>
                <Button variant="secondary" className={sC.halfButton} onClick={props.onApprove}>
                    Approve
                </Button>
                <Button variant="secondary" className={sC.halfButton} onClick={props.onCancel}>
                    Cancel
                </Button>
            </div>

        </div>
    )
}

type Props = {
    label: string
    tempValue: string
    setTempValue: (value: string) => void
    onApprove: () => void
    onCancel: () => void
}
