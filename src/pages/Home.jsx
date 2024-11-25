import NavBar from "../components/NavBar";
import styles from "./Home.module.css";
import trav from "../assets/trav.png";
import decor from "../assets/Decore.png";
import enjoyU from "../assets/enjoyU.png";
import { Link } from "react-router-dom";

const Home = () => {
    
    // Disable scrolling
    document.body.style.overflow = 'hidden';

    return (
        <>  
            <div className={styles.majorContent}>

            <NavBar />
            {/* Hero Section */}
            <div className={styles.main}>
                {/* Left Side */}
                <div className={styles.left}>
                    <h2>Best Destinations around the world</h2>

                    <h1>Travel, enjoy
                        and live a new
                        and full life</h1>
                    
                    <img className={styles.enjoyU} src={enjoyU} alt="decor" />

                    <h3>Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the.</h3>

                   <Link to={"\planner"}> <button>Explore</button> </Link>

                </div>

                {/* Right Side */}
                <div className={styles.right}>
                    <img src={trav} alt="travel" />
                </div>
            </div>
            <img className={styles.decor} src={decor} alt="decor"/>
            </div>
        </>
    );
}

export default Home;