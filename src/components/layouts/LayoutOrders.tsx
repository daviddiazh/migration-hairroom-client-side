import { FC } from 'react';


interface Props {
    children?: any;
}

export const LayoutOrders: FC<Props> = ({ children }) => {
  return (
    <>
        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px',
        }}>
            { children }
        </main>

        <footer>
            {/* TODO: Footer */}
        </footer>
    </>
  )
}
