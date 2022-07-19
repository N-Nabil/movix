import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../store/actions/moviesAction";
import { Row, Col } from "antd";
import "./Movies.css";
import MovieCard from "./MovieCard";
import { Select, Pagination, Button } from "antd";

const { Option } = Select;

export default function Movies() {
  const dispatch = useDispatch();
  const [selectedCategries, setSelectedCategories] = useState([]);
  const [numberOfMoviesPerPage, setNumberOfMoviesPerPage] = useState(12);
  const [pageNumber, setPageNumber] = useState(1);

  const data = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllMovies());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChangeCategory = (value) => {
    setSelectedCategories(value);
  };
  const handleChangeNumber = (value) => {
    setNumberOfMoviesPerPage(value);
  };
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <Button className="nav-btn">Précédent</Button>;
    }
    if (type === "next") {
      return <Button className="nav-btn">Suivant</Button>;
    }
    return originalElement;
  };
  const onChange = (page, pageSize) => {
    setPageNumber(page);
    console.log("CHANGED", page, pageSize);
  };
  return (
    <div className="p-3">
      <Row gutter={[16, 8]} className="text-center">
        <Col xs={24} sm={6} md={10}>
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select your favorite category!"
            onChange={handleChangeCategory}
          >
            {" "}
            {data?.movies?.categories?.map((c) => (
              <Option key={c}>{c}</Option>
            ))}
          </Select>{" "}
        </Col>
        <Col xs={24} sm={16} md={10}>
          {" "}
          <Pagination
            onChange={onChange}
            total={data?.movies?.movies?.length}
            pageSize={numberOfMoviesPerPage}
            itemRender={itemRender}
          />
        </Col>

        <Col xs={24} sm={2}>
          {" "}
          <Select
            placeholder="Movies per page"
            defaultValue="12"
            onChange={handleChangeNumber}
            style={{
              width: "100%",
            }}
          >
            <Option value="4">4</Option>
            <Option value="8">8</Option>
            <Option value="12">12</Option>
          </Select>
        </Col>
      </Row>

      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
        className="mx-0 justify-content-center"
      >
        {data?.movies?.movies
          ?.slice(
            (pageNumber - 1) * numberOfMoviesPerPage,
            pageNumber * numberOfMoviesPerPage
          )
          .filter((obj) => {
            return selectedCategries.length
              ? selectedCategries?.includes(obj.category)
              : true;
          })
          .map((m) => (
            <Col key={m.id} className="p-2">
              <MovieCard movie={m} />
            </Col>
          ))}
      </Row>
    </div>
  );
}
