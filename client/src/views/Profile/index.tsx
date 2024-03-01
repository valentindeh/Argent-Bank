import React, {useEffect, useState} from 'react'
import {useAppDispatch} from '../../store/hooks.ts'
import {fetchUserInfos, updateUserInfos, useUserSelector} from '../../store/userSlice.ts'
import {logout} from '../../store/authSlice.ts'

function Profile() {
    const dispatch = useAppDispatch()
    const {loading, error, userInfos} = useUserSelector()

    useEffect(() => {
        dispatch(fetchUserInfos())
    }, [dispatch])

    const [editingMode, setEditingMode] = useState<boolean>(false)
    const [newFirstName, setNewFirstName] = useState<string>('')
    const [newLastName, setNewLastName] = useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(updateUserInfos({firstName: newFirstName, lastName: newLastName}))
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
                {editingMode ?
                    <>
                        <h1>Welcome back</h1>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <label htmlFor="firstName" className="sr-only">New firstName</label>
                            <input className="input-new-name" type="text" defaultValue={userInfos.firstName} placeholder="firstName" id="firstName"
                                   onChange={(e) => setNewFirstName(e.target.value)}/>
                            <label htmlFor="lastName" className="sr-only">New firstName</label>
                            <input className="input-new-name" type="text" defaultValue={userInfos.lastName} placeholder="lastName" id="lastName"
                                   onChange={(e) => setNewLastName(e.target.value)}/>
                            <div className="form-username-actions">
                                <button onClick={() => setEditingMode(!editingMode)}>Cancel</button>
                                <button type="submit" className="edit-button">Save</button>
                            </div>
                        </form>
                    </> :
                    <>
                        <h1>Welcome back<br/>{userInfos.firstName} {userInfos.lastName}!</h1>
                        <button className="edit-button" onClick={() => setEditingMode(!editingMode)}>Edit Name</button>
                    </>
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
