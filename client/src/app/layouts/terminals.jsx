// import React from "react";
import TerminalsListPage from "../components/page/terminalsListPage";
//
// const Terminals = () => {
//
//     return (
//         <>
//             <TerminalsListPage/>
//         </>
//     );
// };
//
// export default Terminals;

import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/user'
import UserLoader from "../components/ui/hoc/userLoader";

const Users = () => {
    const params = useParams()
    const { userId, edit } = params
    // const currentUserId = useSelector(getCurrentUserId())
    return (
        <>
            <UserLoader>
                {/*{userId ? (*/}
                {/*    edit ? (*/}
                {/*        userId === currentUserId ? (*/}
                {/*            <TerminalsListPage />*/}
                {/*        ) : (*/}
                {/*            <Redirect to={`/users/${currentUserId}/edit`} />*/}
                {/*        )*/}
                {/*    ) : (*/}
                {/*        <TerminalsListPage userId={userId} />*/}
                {/*    )*/}
                {/*) : (*/}
                    <TerminalsListPage />
                {/*)}*/}
            </UserLoader>
        </>
    )
}

export default Users