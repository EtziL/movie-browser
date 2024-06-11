import { motion } from 'framer-motion'

type Props = {
    text?: string
}

const Loader = ({ text }: Props) => {
    return (
        <div className="relative flex h-full items-center justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="border-light-text dark:border-dark-text absolute m-2 -mt-16 h-24 w-24 rounded-full border"
                    initial={{ rotateY: 0, rotateX: 0 }}
                    animate={{ rotateY: [0, 85, 180, 85, 0], rotateX: [0, 85, 180, 85, 0] }}
                    transition={{ repeat: Infinity, duration: 2, repeatType: 'loop', ease: 'linear', times: [0, 0.25, 0.5, 0.75, 1], delay: i * 0.2, repeatDelay: 1 }}
                />
            ))}
            {text && <h1 className="mt-52 animate-pulse text-center font-inter text-base uppercase sm:text-lg">{text}</h1>}
        </div>
    )
}

export default Loader
