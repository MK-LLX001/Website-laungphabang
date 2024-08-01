import { useParams } from "react-router-dom";
import InpageNavigation from "../components/inpage-navigation.component";
import { useState, useEffect } from "react";
import Loader from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";
import NoDataMessage from "../components/nodata.component";
import { getdatdata_allpales } from "../function/place.function.Api";
import CardAll_Palecs from "../components/ิcard-All-Places";

const SearchData_LPG = () => {
    const { query } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await getdatdata_allpales();
            setData(response.data);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (data) {
            const lowercasedQuery = query.toLowerCase();
            const filtered = data.filter(item => 
                item.name.toLowerCase().includes(lowercasedQuery) ||
                item.description.toLowerCase().includes(lowercasedQuery) ||
                item.category_name.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredData(filtered);
        }
    }, [data, query]);

    return (
        <section className="h-cover flex justify-center gap-10">
            <div className="w-full">
                <InpageNavigation routes={[`Search Results for "${query}"`]}>
                    {loading ? (
                        <Loader />
                    ) : data === null ? (
                        <Loader />
                    ) : (
                        <>
                            {filteredData.map((item, index) => (
                                <AnimationWrapper
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                    key={index}
                                >
                                    <CardAll_Palecs content={item} />
                                </AnimationWrapper>
                            ))}
                            {filteredData.length === 0 && <NoDataMessage message="No results found" />}
                        </>
                    )}
                </InpageNavigation>
            </div>
        </section>
    );
}

export default SearchData_LPG;
