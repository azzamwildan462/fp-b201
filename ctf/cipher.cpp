#include <bits/stdc++.h>
#include <cstdio>
using namespace std;

int main()
{

    char str[26];
    char new_str[26];

    scanf("%s", str);

    for (size_t i = 0; i < 26; i++)
    {
        if (str[i] < 90)
            break;
        str[i] -= 96;
        new_str[i] = (str[i] - i) % 26;
        new_str[i] += 96;
        printf("%d %d %d\n", i, str[i], new_str[i]);
    }

    printf("%s", new_str);

    return 0;
}