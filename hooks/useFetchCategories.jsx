import React from "react"


export const useFetchCategories = (setCategoriesList) => {
    const getCategories = () => {
        React.useEffect(() => {
            if(categoriesList && categoriesList.length == 0) {
                axios
                .get('https://ratemycasino.ca/wp-json/custom/v1/posts-categories/')
                .then((response) => {
                    let checkoxData = [];
                    response.data.map(item => checkoxData.push({label: item.name, value: item.slug}))
                    setCategoriesList(checkoxData);
                    console.log(checkoxData)
                })
                .catch((err) => {
                    console.log(err);
                    alert('Error', 'Failed to get article');
                })
                .finally(() => {
                    setIsLoading(false);
                });
            } else {
                setIsLoading(false);
            }
        }, []);
    }

    return { getCategories };

}