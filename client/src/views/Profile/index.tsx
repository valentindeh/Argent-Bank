import React, {useEffect, useState} from 'react'
import {useAppDispatch} from '../../store/hooks.ts'
import {fetchUserInfos, updateUserInfos, useUserSelector} from '../../store/userSlice.ts'

function Profile() {
    const dispatch = useAppDispatch()
    const {error, userInfos} = useUserSelector()
    const [editingMode, setEditingMode] = useState<boolean>(false)
    const [newFirstName, setNewFirstName] = useState<string | undefined>(undefined)
    const [newLastName, setNewLastName] = useState<string | undefined>(undefined)

    useEffect(() => {
        dispatch(fetchUserInfos())
    }, [dispatch])

    useEffect(() => {
        if (!userInfos) {
            return
        }

        setNewFirstName(userInfos.firstName)
        setNewLastName(userInfos.lastName)
    }, [userInfos])


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(updateUserInfos({
            firstName: newFirstName ?? userInfos!.firstName,
            lastName: newLastName ?? userInfos!.lastName
        }))
        setEditingMode(false)
    }

    if (error) {
        return <p>{error}</p>
    }

    if (!userInfos) {
        return <p>Loading</p>
    }

    return (
        <>
            <div className="header">
                {editingMode ?
                    <>
                        <h1>Welcome back</h1>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <label htmlFor="firstName" className="sr-only">New firstName</label>
                            <input className="input-new-name" type="text" placeholder="firstName" id="firstName"
                                   onChange={(e) => setNewFirstName(e.target.value)} value={newFirstName}/>
                            <label htmlFor="lastName" className="sr-only">New lastName</label>
                            <input className="input-new-name" type="text" placeholder="lastName" id="lastName"
                                   onChange={(e) => setNewLastName(e.target.value)} value={newLastName}/>
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
