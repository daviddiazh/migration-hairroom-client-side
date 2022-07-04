import style from './Loading.module.css'

export const Loading = () => {
    return (
        <div className={style['body-spinner']}>
            <div className={style['lds-ring']}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>  
        </div>
    )
}