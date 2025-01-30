import "./RepoStatsComponent.scss";
import { getGithubLink } from "../../Helpers/Helpers";
import { observer } from "mobx-react-lite";
import { useCallback, useContext, useEffect } from "react";
import { Context } from "../../main";
import useAuthenticatedRequest from "../../Hooks/useAuthenticatedRequest";
import { getLastRepos } from "../../API/RepoAPI";

const RepoStatsComponent = observer(() => {
    const { makeRequest, isLoading } = useAuthenticatedRequest();
    const { lastRepos, setLastRepos } = useContext(Context);

    const updateLastRepos = useCallback(async () => {
        if (!isLoading) {
            const result = await makeRequest(getLastRepos);
            if (result) {
                if (result.ok && result.data) {
                    setLastRepos(result.data);
                }
            }
        }
    }, []);

    useEffect(() => {
        updateLastRepos();
    }, [updateLastRepos]);

    return (
        <div className="repo-stats-container">
            <h2>Recently checked repositories</h2>
            <table>
                <thead>
                    <tr>
                        <th>Repo author</th>
                        <th>Repo name</th>
                        <th>Checked times</th>
                        <th>Repo score</th>
                    </tr>
                </thead>
                <tbody>
                    {lastRepos.map((repo) => {
                        return (
                            <tr className="repo-item" key={repo.id}>
                                <td>{repo.author}</td>
                                <td>
                                    <a href={getGithubLink(repo.author, repo.name)} target="_blank">
                                        {repo.name}
                                    </a>
                                </td>
                                <td>{repo.checkedTimes}</td>
                                <td>{repo.score ?? "?"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
});

export default RepoStatsComponent;
