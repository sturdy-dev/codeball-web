export type BugFixingCommit = {
    repo_name: string;
    best_scenario_issue_date: string;
    fix_commit_hash: string;
    inducing_commit_hash: string[];
}

export type CommitMeta = {
    hash: string;
    message: string;
    diff: string;
    // authored_by: string;
    // authored_at: string;
    // commited_by: string;
    // commited_at: string;
}