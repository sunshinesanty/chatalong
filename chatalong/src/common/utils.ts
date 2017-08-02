const generateID = (): number => {
    return Math.floor(Math.random() * 2000000);
};

const commonUtils = {
    generateID
};

export default commonUtils;
