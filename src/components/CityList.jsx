import { useCities } from "../context/CitiesContext"
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";

const CityList = () => {
    const { cities, isLoading } = useCities();
    if (isLoading) return <Spinner />
    if (cities.length === 0) return (<Message message="No cities yet, add some to view them here" />)
    return (
        <ul className={styles.cityList}>
            {
                cities.map(function (city) {
                    return <CityItem key={city.id} city={city} />
                })
            }
        </ul>
    )
}

export default CityList