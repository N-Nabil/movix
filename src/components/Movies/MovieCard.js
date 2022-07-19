import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMovie } from '../../store/actions/moviesAction';
import { Card,Row,Col } from 'antd';
import {LikeOutlined,DislikeOutlined, DeleteFilled, LikeFilled, DislikeFilled} from "@ant-design/icons"
import "./Movies.css";


export default function MovieCard(props) {
  const dispatch = useDispatch();
  const { movie } = props;
  const {
    title,
    category,
    likes,
    dislikes,
  } = movie;
  const [isLikeState, setIsLikeState] = useState(false);
  const [numberLikes, setNumberLikes] = useState(likes);
  const [numberDislikes, setNumberDislikes] = useState(dislikes);
  const [isClicked, setIsClicked] = useState(false);

  const handleLike = () => {
    if (!isLikeState) {
        setNumberLikes(prevCount => prevCount + 1);
        if (numberDislikes && isClicked){
            setNumberDislikes(prevCount => prevCount - 1);
        }else{
            setNumberDislikes(prevCount => prevCount)
        }
    } else {
        setNumberDislikes(prevCount => prevCount + 1);
        if (numberLikes && isClicked){
            setNumberLikes(prevCount => prevCount -1)
        }else{
            setNumberLikes(prevCount => prevCount)
        }
  };
  setIsLikeState(!isLikeState);
  setIsClicked(true);


}
  return (
            <Card
            title={title}
            style={{
              width:300
            }}
            actions={[
              <DeleteFilled style={{color:"#d90000"}} onClick={()=>dispatch(deleteMovie(props.movie.id))} />,
             <>{!isLikeState ? <LikeFilled style={{color:isClicked?"#f34a2e":"#1890ff"}} onClick={()=>handleLike()}/> : <DislikeFilled style={{color:isClicked?"#f34a2e":"#1890ff"}}  onClick={()=>handleLike()}/>}</>
              ,
            ]}        
          >
            <Row gutter={24} className="justify-content-center">
              <Col span={10}>{category}</Col>
              <Col span={2}>
                
                <LikeOutlined style={{color:"green"}} /></Col>
                <Col span={4}>{numberLikes}</Col>
              <Col span={2}><DislikeOutlined style={{color:"red"}} /></Col>
              <Col span={4}>{numberDislikes}</Col>

            </Row>
          </Card>              
          );
}


