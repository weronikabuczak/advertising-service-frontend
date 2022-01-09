import {statuses} from "./taskStatus";
import {categories} from "./taskCategory";
import React from "react";

export const formatDate = (dateInString) => new Date(dateInString).toLocaleDateString();

export const getStatusLabel = (taskStatus, currentLanguage) => statuses[taskStatus][currentLanguage] || statuses[taskStatus]['pl'];
export const getStatusColorClass = (taskStatus) => statuses[taskStatus]['colorClass'];
export const getStatusColor = (taskStatus) => statuses[taskStatus]['colors'];

export const getCategoryLabel = (category, currentLanguage) => categories[category][currentLanguage] || categories[category]['pl'];
export const getCategoryColorClass = (category) => categories[category]['colorClass'];
export const getCategoryColor = (category) => categories[category]['colors'];

