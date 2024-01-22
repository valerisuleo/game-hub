import LikeComponent from 'src/app/library/like/like';
import styles from './home.module.scss';

const Home = () => {

    const handleLike = (isActive) => {
        console.log('like', isActive);
        
    }
    return (
        <div className={styles['container']}>
            <h1>Welcome to Home!</h1>
            <LikeComponent onEmitEvent={handleLike} color='pink' size={40}></LikeComponent>
        </div>
    );
};

export default Home;
