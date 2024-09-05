import "./search.css";
import useFetch from "../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import ReactSlider from "react-slider";
import Select from "react-select"

const Search = () => {

    const params = useParams();

    const {data} = useFetch(
      `/phone/search/${params.title}`
    )
    
    const [result, setResult] = useState(data);
    useEffect(() => {
      setValue("Brands");
      setResult(data);
    }, [data]);

    const [value, setValue] = useState("Brands");
    const options = [{value: "Brands", label: "Brands"}];
    const getBrands = () => {
      data.forEach((listing) => {
        var isnew = true;
        for (var i = 0; i < options.length; i++) {
          if (options[i].value === `${listing.brand}`) {
            isnew = false
          }
        }
        if (isnew) {
          options.push({value: `${listing.brand}`, label: `${listing.brand}`})
        }
      })
    }
    getBrands();

    const MIN = 0;
    const [MAX, setMAX] = useState(null);
    const [range, setRange] = useState([MIN, MAX]);
    useEffect(() => {
      fetch(`/phone/search/${params.title}/max-price`)
        .then((res) => res.json())
        .then((maxPrice) => {
          if (maxPrice.length === 0) {
            setMAX(0);
            setRange([0, 0])
          } else {
            setMAX(maxPrice[0].price);
            setRange([0, maxPrice[0].price]);
          }
        });
    }, [params.title]);
    
    const { data: filterData } = useFetch(
      `/phone/search/${params.title}/${range[0]}/${range[1] !== null ? range[1] : 0}/${value}`
      );
      useEffect(() => {
        setResult(filterData);
      }, [ filterData, value, range ]);
    
    return (
        <div className="listing-container">
          <div className="filters">
            <Select options={options} 
                    placeholder="Brands" 
                    value={{ value: value, label: value }}
                    onChange={(e) => setValue(e.value)} 
                    className="select-menu"/>
            <div className="price-filter">
              <p>From ${range[0]} to ${range[1]}</p>
              <div className="slider-container">
                <ReactSlider value={range} 
                      onChange={setRange}
                      min={MIN} max={MAX}
                      trackClassName="track"
                      className="price-slider"/>
              </div>
            </div>
          </div>
          <div className="results">
            <p>Search Results</p>
            <div>
            <table className="result-table">
                <thead>
                    <tr>
                      <th>TITLE</th>
                      <th>BRAND</th>
                      <th>PRICE</th>
                    </tr>
                </thead>
                
                <tbody>
                  {
                    result?.map((listing) => (
                      <tr>
                        <Link to={`/item/${listing._id}`} className="item-link"><td>{listing.title}</td></Link>
                        <td>{listing.brand}</td>
                        <td>{listing.price}</td>
                      </tr>
                    ))
                  }
                </tbody>
            </table>
            </div>
          </div>
        </div>
        

        
    );
}

export default Search;