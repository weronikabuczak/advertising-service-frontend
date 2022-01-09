import {statuses} from "./taskStatus";

export const formatDate = (dateInString) => new Date(dateInString).toLocaleDateString()
export const getStatusLabel = (taskStatus, currentLanguage) => statuses[taskStatus][currentLanguage] || statuses[taskStatus]['pl'];
export const getStatusColorClass = (taskStatus) => statuses[taskStatus]['colorClass'];
export const getStatusColor = (taskStatus) => statuses[taskStatus]['colors'];
