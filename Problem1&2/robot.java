import java.util.*;
public class robot {
    public static void main (String args[] ){
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
        int n=sc.nextInt();
        int [][] path = new int [m][n];
        for(int i=0;i<m;i++) path[i][0]=1;
        for(int i=0;i<n;i++) path[0][1]=1;
        // We know that from borders we can go 

        for(int i=1;i<m;i++)
            for(int j=1;j<n;j++)
                path[i][j]=path[i-1][j]+path[i][j-1];
        
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++)
                System.out.print(path[i][j]+" ");
            System.out.println();
        }
        System.out.println(path[m-1][n-1]);
    }
}
