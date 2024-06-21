import { useEffect } from 'react'
import { useToast } from './../../index'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { HiOutlineCheck, HiOutlineInformationCircle, HiOutlineExclamationTriangle } from 'react-icons/hi2'

const Toast = () => {
    const animationControls = useAnimation()
    const { toast, hideToast } = useToast()
    const { isVisible, type, message } = toast
    const TRANSITION_DURATION = 0.25

    useEffect(() => {
        let timeouts: number[] = []
        if (toast.isVisible) {
            animationControls.start({ opacity: 1, y: 0, translateX: '-50%', transition: { duration: TRANSITION_DURATION } })
            timeouts.push(
                setTimeout(() => {
                    animationControls.start({ opacity: 0, y: -10, translateX: '-50%', transition: { duration: TRANSITION_DURATION } })
                    timeouts.push(setTimeout(hideToast, TRANSITION_DURATION * 1000))
                }, 3500)
            )
            return () => {
                timeouts.forEach((timeout) => clearTimeout(timeout))
            }
        }
    }, [isVisible, animationControls, hideToast])

    const stylesForType = {
        styleClass: {
            info: 'bg-blue-100 text-blue-800',
            error: 'bg-red-100 text-red-800',
            success: 'bg-green-100 text-green-800',
        },
        icon: {
            info: <HiOutlineInformationCircle size={20} />,
            error: <HiOutlineExclamationTriangle size={20} />,
            success: <HiOutlineCheck size={20} />,
        },
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    data-testid="toast-container"
                    initial={{ opacity: 0, y: -10, translateX: '-50%' }}
                    transition={{ duration: TRANSITION_DURATION }}
                    animate={animationControls}
                    className={`fixed top-5 rounded-lg p-4 ${stylesForType.styleClass[type]} left-1/2 z-50 flex min-w-60 max-w-full transform items-center gap-2 text-sm`}
                >
                    {stylesForType.icon[type]}
                    <div className="flex-1">
                        <h3 className="font-semibold">{`${type.charAt(0).toUpperCase()}${type.slice(1)}: `}</h3>
                        {message}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Toast
