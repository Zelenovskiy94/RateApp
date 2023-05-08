import styled from "styled-components"
import ShareButton from "../Article/Share";

const HeaderPostRightView = styled.View`
    flex-direction: row;
    align-items: center
`;

export const HeaderPostRight = ({ postData }) => {
    return (
        <HeaderPostRightView>
            <ShareButton title={postData.title_article ? postData.title_article : 'RateMyCasino'} url={postData.link}/>
        </HeaderPostRightView>
    )

}