import React, { Component, useEffect, useState } from "react";
import { getUsers } from "../api/apiCalls";
import { useTranslation } from "react-i18next";
import UserListItem from "./UserListItem";
import { useApiProgress } from "../shared/ApiProgress";

const UserList = () => {
  const [page, setPage] = useState({
    content: [],
    number: 0,
    size: 10,
  });

  const pendingApiCall = useApiProgress("/api/user?page");
  const [loadFailure, setLoadFailure] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const onClickNext = () => {
    const nextPage = page.number + 1;
    loadUsers(nextPage);
  };

  const onClickPrevious = () => {
    const previousPage = page.number - 1;
    loadUsers(previousPage);
  };

  const loadUsers = async (page) => {
    setLoadFailure(false);
    try {
      const response = await getUsers(page);
      setPage(response.data);
    } catch (error) {
      setLoadFailure(true);
    }
  };
  const { content: users, last, first } = page;
  const { t } = useTranslation();

  let actionDiv = (
    <div>
      {first === false && (
        <button className="btn btn-sm btn-light" onClick={onClickPrevious}>
          {t("Previous")}
        </button>
      )}
      {last === false && (
        <button
          className="btn btn-sm btn-light float-right"
          onClick={onClickNext}
        >
          {t("Next")}
        </button>
      )}
    </div>
  );

  if (pendingApiCall === true) {
    actionDiv = (
      <div className="d-flex justify-content-center p-1">
        <div className="spinner-border text-black-50">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="card-header text-center">{t("Users")}</h3>
      <div className="list-group-flush">
        {users.map((user, index) => (
          <UserListItem user={user} key={user.username} />
        ))}
      </div>
      {actionDiv}
      {loadFailure && (
        <div className="text-center text-danger">{t("Load Failure")}</div>
      )}
    </div>
  );
};
export default UserList;
