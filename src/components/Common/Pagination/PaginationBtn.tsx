import { motion } from 'framer-motion'
import { IconType } from 'react-icons'

type Props = {
    disabledCondition?: boolean
    onClickFnc: () => void
    Icon?: IconType
    pageNumber?: number
    active?: boolean
}

const PaginationBtn = ({ disabledCondition, onClickFnc, Icon, pageNumber, active }: Props) => {
    return (
        <motion.button
            className={`flex h-10 w-10 items-center justify-center rounded-full p-3 text-offWhite transition-colors hover:bg-darkRed hover:bg-opacity-30 disabled:opacity-50 disabled:hover:bg-transparent ${active ? 'bg-darkRed bg-opacity-30' : ''}`}
            onClick={onClickFnc}
            disabled={disabledCondition}
            whileTap={disabledCondition ? {} : { scale: 0.9 }}
        >
            {Icon ? (
                <div>
                    <Icon size={20} />
                </div>
            ) : (
                <p>{pageNumber}</p>
            )}
        </motion.button>
    )
}

export default PaginationBtn
