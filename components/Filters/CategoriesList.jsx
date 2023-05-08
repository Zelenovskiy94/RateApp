import axios from "axios";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import styled from "styled-components";
import { COLORS } from "../../vars/colors";
import { Loading } from "../Loading";
import CheckboxForm from "../Checkbox/Checkbox";
import TEXT_CONTENT from "../../vars/text";

const CategoriesListView = styled.View`
    height: 450px;
    width: 100%;
    z-index: 10;
    overflow: hidden;
    flex: 1;
    background-color: ${COLORS.white},
`;


export const CategoriesList = ({ setSelectedCategories, categoriesList, setCategoriesList }) => {
    const onSelect = (items) => {
        let selectedItems = [];
        items.map(item => {
            if(item.RNchecked) {
                selectedItems.push(item.value)
            }
        })
        setSelectedCategories(selectedItems)
    }
    return (
        <CategoriesListView> 
            <Text style={styles.title}>{TEXT_CONTENT.categories_title}</Text>
            <CheckboxForm
                style={styles.checkbox}
                textStyle={styles.ckeckboxText}
                dataSource={categoriesList}
                itemShowKey="label"
                itemCheckedKey="RNchecked"
                iconSize={22}
                iconColor={COLORS.default}
                formHorizontal={false}
                labelHorizontal={true}
                onChecked={(item) => onSelect(item)}
            />
        </CategoriesListView>
        
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    checkbox: {
        flex: 1,
    },
    ckeckboxText: {
        fontSize: 16,
    }
})