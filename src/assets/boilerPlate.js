export const initText = `
#include <iostream>
#include <vector>
#include <map>
#include <algorithm>

using namespace std;

vector<int> solve(vector<int>& nums, int target) {
    map<int, int> hashMap;
    for(int i = 0; i < nums.size(); i++) {
        if(hashMap.find(target - nums[i]) != hashMap.end()) {
            return {i, hashMap[target - nums[i]]};
        }
        hashMap.insert({nums[i], i});
    }
    return {-1, -1};
}

int main() {
    vector<vector<int>> inputs = {
        {2, 7, 11, 15},
        {3, 2, 4},
        {3, 3}
    };
    vector<int> targets = {9, 6, 6};

    for(int j = 0; j < inputs.size(); j++) {
        vector<int> arr = inputs[j];
        int target = targets[j];
        
        vector<int> ans = solve(arr, target);
        int m = ans.size();
        
        cout << "[";
        for(int i = 0; i < m; i++) {
            if(i != m-1)
                cout << ans[i] << ",";
            else
                cout << ans[i];
        }
        cout << "]" << endl;
    }

    return 0;
}`;