import React, { useEffect, useState } from "react";
import { Row, Pagination, Spin, Input } from "antd";
import MovieCard from "./MovieCard";
import { fetchMoviesList } from "../api/api";

const { Search } = Input;

const MoviesList = () => {
	const [movies, setMovies] = useState([]);
	const [totalPage, setTotalPage] = useState();
	const [currenPage, setCurrentPage] = useState(1);
	const [Loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState("fast");

	const handlePageChange = (value) => {
		setCurrentPage(value);
	};

	const onSearch = (value) => {
		setSearchText(value);
	};

	useEffect(() => {
		setLoading(true);
		fetchMoviesList(currenPage, searchText).then((response) => {
			setMovies(response.Search);
			setTotalPage(response.totalResults);
			setLoading(false);
		});
	}, [currenPage, searchText]);

	return (
		<Spin spinning={Loading}>
			<Pagination
				defaultcurrent={currenPage}
				onChange={handlePageChange}
				total={totalPage}
				showSizeChanger={false}
			/>
			<Search
				placeholder="Input Search Text"
				onSearch={onSearch}
				enterButton
				style={{ width: "400px", marginLeft: "200px" }}
			/>
			<Row>
				{movies &&
					movies?.length &&
					movies.map((movie) => (
						<div key={movie?.imdbID}>
							<MovieCard movie={movie} />
						</div>
					))}
			</Row>
		</Spin>
	);
};

export default MoviesList;
