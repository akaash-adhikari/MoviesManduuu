import React, { useState } from "react";
import { Card, Row, Tag, Modal, Col } from "antd";
import axios from "axios";

const { Meta } = Card;

const baseUrl = `http://www.omdbapi.com/?`;

const MovieCard = ({ movie }) => {
	const [modalVisible, setModalVisible] = useState(false);
  const [movieDetail, setMovieDetail] = useState();
 
  
	const handleMovieClick = (id) => {

    fetchMovieDetailById(id).then(() => {
      setModalVisible(!modalVisible);
    });
    
  };
  const handleOk = () => setModalVisible(!modalVisible);
  const handleCancel = () => setModalVisible(!modalVisible);
	const description = (
		<>
			<Tag color="magenta">{movie?.Year}</Tag>
			<Tag color="blue">{movie.Type}</Tag>
		</>
	);

  const fetchMovieDetailById = (id) => {
    return axios
    .get(`${baseUrl}i=${id}&apikey=e4e6e50f`)
    .then((response)=>{
      setMovieDetail(response?.data);
      return response;
    })
    .catch((error) => {
      console.log(error?.response);
      return error?.response;
    });
  };

  const handleMovieRating = () => {
    const rate = movieDetail?.imdbRating;
    return (rate/2)
  }

	return (
    <>
    
		<Card
			hoverable
			style={{ width: 240, margin: "20px" }}
			cover={<img alt="example" src={movie?.Poster} 
      onClick = {() => handleMovieClick(movie?.imdbID)}
      />}
		>
			<Meta title={movie?.Title} description={description} />
      </Card>
      <Modal
				title={movieDetail?.Title}
				visible={modalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Modal>
      <Row>
        <Col span={8}>
          <Card cover={<img alt="example" src={movieDetail?.Poster}></img>}/>
        </Col>
        <Col span={16} style={{ textAlign:"center"}}>
          <div>
            <strong>Detail Information</strong>
          </div>
        </Col>
      </Row>
	
    </>
	);
};

export default MovieCard;
