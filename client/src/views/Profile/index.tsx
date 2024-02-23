import React, {useEffect, useState} from 'react'
import {useAppDispatch} from '../../store/hooks.ts'
import {fetchUserInfos, updateUsername, useUserSelector} from '../../store/userSlice.ts'
import {logout} from '../../store/authSlice.ts'

function Profile() {
    const dispatch = useAppDispatch()
    const {loading, error, userInfos} = useUserSelector()

    useEffect(() => {
        dispatch(fetchUserInfos())
    }, [dispatch])

    const [editingMode, setEditingMode] = useState<boolean>(false)
    const [newUserName, setNewUserName] = useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(updateUsername({userName: newUserName}))
        setEditingMode(false)
    }

    if (error) {
        return <p>{error}</p>
    }

    if (loading) {
        return <p>{loading}</p>
    }

    if (!userInfos) {
        dispatch(logout())
        return
    }

    return (
        <>
            <div className="header">
                <h1>Welcome back<br/>{userInfos.firstName} {userInfos.lastName}!</h1>
                { editingMode ?
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor="username" className="sr-only">New username</label>
                        <input className="input-new-username" type="text" defaultValue={userInfos.userName}
                               placeholder="Username" id="username"
                               onChange={(e) => setNewUserName(e.target.value)}/>
                        <div className="form-username-actions">
                            <button onClick={() => setEditingMode(!editingMode)}>Cancel</button>
                            <button type="submit" className="edit-button">Save</button>
                        </div>
                    </form> :
                    <button className="edit-button" onClick={() => setEditingMode(!editingMode)}>Edit Name</button>
                }
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </>
    )
}

export default Profile
