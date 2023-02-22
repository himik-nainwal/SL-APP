import java.util.Scanner;

public class waterTrap {

    public static int trap(int[] height) {
        int result = 0;
        int len = height.length;
        int[] left = new int[len];
        int[] right = new int[len];
        left[0] = height[0];
        right[len - 1] = height[len - 1];
        for (int i = 1; i < len; i++) {
            left[i] = Math.max(left[i - 1], height[i]);
        }
        for (int i = len - 2; i >= 0; i--) {
            right[i] = Math.max(right[i + 1], height[i]);
        }
        for (int i = 0; i < len; i++) {
            result += (Math.min(left[i], right[i]) - height[i]);
        }
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the size of the elevation map: ");
        int size = sc.nextInt();
        int[] elevationMap = new int[size];
        System.out.println("Enter the elements of the elevation map: ");
        for (int i = 0; i < size; i++) {
            elevationMap[i] = sc.nextInt();
        }
        int waterTrapped = trap(elevationMap);
        System.out.println(waterTrapped);
        sc.close();
    }
}
