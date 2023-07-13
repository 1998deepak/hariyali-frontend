export const getLoginModel = (data) => {
    console.log(data);
    return {
        userName: data?.userName,
        password: data?.password
    };
}

