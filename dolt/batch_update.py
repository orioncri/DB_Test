import argparse
import datetime
import logging
import math
import os
import shutil
import dolt_utils

from doltpy.core import Dolt, DoltException

LOG_LEVEL = logging.FATAL
logger = logging.getLogger()
logger.setLevel(LOG_LEVEL)

def main():
    repo_path = "."
    repo = Dolt(repo_path)

    start_time = datetime.datetime.now()

    branch, start, stop, person, size = get_args()
    dolt_utils.switch_branch(repo, branch)
    batch_revisions(repo, start, stop, size, person)
    repo.add(["person"])
    repo.commit(f"End of batch for {person}")

    stop_time = datetime.datetime.now()

    print(start_time)
    print(stop_time)
    print(stop_time-start_time)


def batch_revisions(repo, start, stop, step, name):
    if start >= stop:
        print(f"ERROR: start should be greater than stop: {start} !< {stop}")

    print(f"Revisions {start} - {stop} for {name}")
    while start < stop:
        print(f"    Batch {start:>3} - {start+step-1:>3}")
        _create_revisions_via_batches(repo, start, start+step, name)
        start = start + step

def _create_revisions_via_batches(repo, start, stop, name):
    batch_query = ""
    for revId in range(start,stop):
        batch_query += change_person_revid_query_string(repo, name, revId)
        message = f"{name}    RevID={revId:0>2}"
        batch_query += commit_via_sql_string(repo, message)

    repo.sql(query=batch_query, result_format="tabular", batch=True)

def change_person_revid_query_string(repo, person, revision):
    query = f"UPDATE person SET rev_id = {revision} WHERE first_name='{person}';"
    return query

def commit_via_sql_string(repo, message):
    query = f"SELECT DOLT_COMMIT('-a', '-m', '{message}', '--allow-empty') ; "
    return query

def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-b", "--branch", help="Branch to use", required=True)
    parser.add_argument("-s", "--start", help="Start of batch", type=int, required=True)
    parser.add_argument("-t", "--stop", help="Stop of batch", type=int, required=True)
    parser.add_argument("-p", "--person", help="Person to update", required=True)
    parser.add_argument("-x", "--size", help="Batch Size", type=int, default=50)
    args = parser.parse_args()
    return args.branch, int(args.start), int(args.stop), args.person, args.size

if __name__ == "__main__":
    main()
