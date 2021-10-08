import React, { Fragment } from "react";
import styled from "styled-components";
import Gray from "./Stars/Gray";
import Hover from "./Stars/Hover";
import Selected from "./Stars/Selected";

const RatingContainer = styled.div`
  text-align: center;
  border-radius: 4px;
  font-size: 18px;
  padding: 40px 0 10px 0;
  border: 1px solid #e6e6e6;
  background: #fff;
`;
const RatingBox = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  position: relative;

  input {
    display: none;
  }

  label {
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-image: url("data:image/svg+xml;,${Gray}");
    background-repeat: no-repeat;
    backgound-position: center;
    background-size: 70%;
  }

  input:checked ~ label,
  input:checked ~ label ~ label {
    background-image: url("data:image/svg+xml;,${Selected}");
  }

  input:not(:checked) ~ label:hover,
  input:not(:checked) ~ label:hover ~ label {
    background-image: url("data:image/svg+xml;,${Hover}");
  }
`;

const Field = styled.div`
  border-radius: 4px;

  input {
    width: 100%;
    min-height: 50px;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    margin: 12px 0;
    padding: 12px;
  }

  textarea {
    wdith: 100%;
    min-height: 80px;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    margin: 12px 0;
    padding: 12px;
  }
`;
const Wrapper = styled.div`
  background: #000;
  padding: 20px;
  height: 100vh;
  padding-top: 100px;
`;
const SubmitBtn = styled.button`
  color: #fff;
  background: #333;
  border-radius: 4px;
  padding: 12px;
  font-size: 18px;
  cursor: pointer;
  transition: ease-in-out 0.1s;
  border: 1px solid #fff;
  text-align: center;
  margin-top: 10px;
  width: 100%;

  &:hover {
    background: #fff;
    color: #000;
    border: 1px solid #fff;
  }
`;
const Headline = styled.div`
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: center;
`;
const RatingTitle = styled.div`
  font-size: 20px;
  padding-bottom: 20px;
  font-weight: bold;
`;

// const Input = styled.input`
//   width: 100%;
//   box-sizing: border-box;
//   -webkit-box-sizing: border-box;
//   -moz-box-sizing: border-box;
//   font-size: 18px;
//   padding: 10px;
//   margin: 10px;
//   background: papayawhip;
//   border: none;
//   border-radius: 3px;
//   ::placeholder {
//     color: palevioletred;
//   }
// `;

const Input = styled.input.attrs(() => ({
  type: "text",
}))`
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
`;

const ReviewForm = (props) => {
  const ratingOptions = [5, 4, 3, 2, 1].map((score, index) => {
    return (
      <Fragment key={index}>
        <input
          type="radio"
          value={score}
          checked={props.review.score == score}
          name="rating"
          onChange={() => console.log("selected", score)}
          id={`rating-${score}`}
        />
        <label onClick={props.setRating.bind(this, score)}></label>
      </Fragment>
    );
  });

  return (
    <Wrapper>
      <form onSubmit={props.handleSubmit}>
        <Headline>
          Have an experience with {props.attributes.name}? Share your review!
        </Headline>
        <Field>
          <Input
            onChange={props.handleChange}
            //   || '' prevents from Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen.
            value={props.review.title || ""}
            type="text"
            name="title"
            placeholder="Review Title"
          />
        </Field>
        <Field>
          <Input
            onChange={props.handleChange}
            value={props.review.description || ""}
            type="text"
            name="description"
            placeholder="Review Description"
          />
        </Field>
        <Field>
          <RatingContainer>
            <RatingTitle>Rate This Airline</RatingTitle>
            <RatingBox>{ratingOptions}</RatingBox>
          </RatingContainer>
        </Field>
        <SubmitBtn type="submit">Submit Your Review</SubmitBtn>
      </form>
    </Wrapper>
  );
};

export default ReviewForm;
